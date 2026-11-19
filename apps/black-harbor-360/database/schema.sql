-- BLACK HARBOR 360, planowana izolowana baza produkcyjna.
-- NIE URUCHAMIAĆ W INNYCH ISTNIEJĄCYCH PROJEKTACH.
-- Wykonanie dopiero w dedykowanym projekcie Supabase po zatwierdzeniu kosztu i organizacji.

begin;

create table if not exists public.bh360_workspaces (
    id uuid primary key default gen_random_uuid(),
    name text not null check (char_length(trim(name)) between 2 and 120),
    created_at timestamptz not null default now()
);

create table if not exists public.bh360_memberships (
    workspace_id uuid not null references public.bh360_workspaces(id) on delete cascade,
    user_id uuid not null references auth.users(id) on delete cascade,
    role text not null check (role in ('owner','manager','operator','read_only')),
    joined_at timestamptz not null default now(),
    primary key (workspace_id, user_id)
);

create index if not exists bh360_memberships_user_idx
    on public.bh360_memberships (user_id, workspace_id);

create table if not exists public.bh360_clients (
    id uuid primary key default gen_random_uuid(),
    workspace_id uuid not null references public.bh360_workspaces(id),
    name text not null check (char_length(trim(name)) between 2 and 120),
    phone text check (phone is null or char_length(phone) <= 24),
    email text check (email is null or char_length(email) <= 254),
    notes text not null default '' check (char_length(notes) <= 3000),
    created_by uuid not null default auth.uid() references auth.users(id),
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    unique (workspace_id, id),
    check (phone is not null or email is not null)
);

create index if not exists bh360_clients_workspace_name_idx
    on public.bh360_clients (workspace_id, name);

create table if not exists public.bh360_vehicles (
    id uuid primary key default gen_random_uuid(),
    workspace_id uuid not null references public.bh360_workspaces(id),
    client_id uuid not null,
    make_model text not null check (char_length(trim(make_model)) between 2 and 120),
    year integer check (year between 1950 and 2100),
    registration text check (registration is null or char_length(registration) <= 20),
    notes text not null default '' check (char_length(notes) <= 2000),
    created_by uuid not null default auth.uid() references auth.users(id),
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    unique (workspace_id, id),
    constraint bh360_vehicles_client_same_workspace
        foreign key (workspace_id, client_id)
        references public.bh360_clients (workspace_id, id)
);

create index if not exists bh360_vehicles_client_idx
    on public.bh360_vehicles (workspace_id, client_id);

create table if not exists public.bh360_leads (
    id uuid primary key default gen_random_uuid(),
    workspace_id uuid not null references public.bh360_workspaces(id),
    client_id uuid,
    name text not null check (char_length(trim(name)) between 2 and 120),
    phone text check (phone is null or char_length(phone) <= 24),
    email text check (email is null or char_length(email) <= 254),
    service text not null,
    vehicle_label text not null default '' check (char_length(vehicle_label) <= 120),
    source text not null default 'Inne' check (char_length(source) <= 100),
    status text not null default 'Nowy'
        check (status in ('Nowy','Kontakt','Wycena','Wygrany','Utracony')),
    next_contact date,
    notes text not null default '' check (char_length(notes) <= 3000),
    created_by uuid not null default auth.uid() references auth.users(id),
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    unique (workspace_id, id),
    check (phone is not null or email is not null),
    constraint bh360_leads_client_same_workspace
        foreign key (workspace_id, client_id)
        references public.bh360_clients (workspace_id, id)
);

create index if not exists bh360_leads_workspace_status_idx
    on public.bh360_leads (workspace_id, status, next_contact);
create index if not exists bh360_leads_workspace_created_idx
    on public.bh360_leads (workspace_id, created_at desc);

create table if not exists public.bh360_activities (
    id uuid primary key default gen_random_uuid(),
    workspace_id uuid not null references public.bh360_workspaces(id),
    entity_type text not null check (entity_type in ('system','lead','client','vehicle')),
    entity_id uuid,
    action text not null check (char_length(action) between 1 and 160),
    detail text not null default '' check (char_length(detail) <= 2000),
    actor_id uuid not null default auth.uid() references auth.users(id),
    created_at timestamptz not null default now()
);

create index if not exists bh360_activities_workspace_created_idx
    on public.bh360_activities (workspace_id, created_at desc);

alter table public.bh360_workspaces enable row level security;
alter table public.bh360_memberships enable row level security;
alter table public.bh360_clients enable row level security;
alter table public.bh360_vehicles enable row level security;
alter table public.bh360_leads enable row level security;
alter table public.bh360_activities enable row level security;

-- Membership nie może być nadane przez użytkownika na podstawie jego własnych danych.
-- Zaproszenia i nadawanie ról przeprowadza wyłącznie zaufany proces administracyjny.
create policy bh360_memberships_read_own on public.bh360_memberships
    for select to authenticated
    using (user_id = (select auth.uid()));

create policy bh360_workspaces_member_read on public.bh360_workspaces
    for select to authenticated
    using (exists (
        select 1 from public.bh360_memberships m
        where m.workspace_id = id and m.user_id = (select auth.uid())
    ));

create policy bh360_clients_member_read on public.bh360_clients
    for select to authenticated
    using (exists (
        select 1 from public.bh360_memberships m
        where m.workspace_id = bh360_clients.workspace_id and m.user_id = (select auth.uid())
    ));
create policy bh360_clients_staff_insert on public.bh360_clients
    for insert to authenticated
    with check (created_by = (select auth.uid()) and exists (
        select 1 from public.bh360_memberships m
        where m.workspace_id = bh360_clients.workspace_id and m.user_id = (select auth.uid())
          and m.role in ('owner','manager','operator')
    ));
create policy bh360_clients_staff_update on public.bh360_clients
    for update to authenticated
    using (exists (
        select 1 from public.bh360_memberships m
        where m.workspace_id = bh360_clients.workspace_id and m.user_id = (select auth.uid())
          and m.role in ('owner','manager','operator')
    ))
    with check (exists (
        select 1 from public.bh360_memberships m
        where m.workspace_id = bh360_clients.workspace_id and m.user_id = (select auth.uid())
          and m.role in ('owner','manager','operator')
    ));

create policy bh360_vehicles_member_read on public.bh360_vehicles
    for select to authenticated
    using (exists (
        select 1 from public.bh360_memberships m
        where m.workspace_id = bh360_vehicles.workspace_id and m.user_id = (select auth.uid())
    ));
create policy bh360_vehicles_staff_insert on public.bh360_vehicles
    for insert to authenticated
    with check (created_by = (select auth.uid()) and exists (
        select 1 from public.bh360_memberships m
        where m.workspace_id = bh360_vehicles.workspace_id and m.user_id = (select auth.uid())
          and m.role in ('owner','manager','operator')
    ));
create policy bh360_vehicles_staff_update on public.bh360_vehicles
    for update to authenticated
    using (exists (
        select 1 from public.bh360_memberships m
        where m.workspace_id = bh360_vehicles.workspace_id and m.user_id = (select auth.uid())
          and m.role in ('owner','manager','operator')
    ))
    with check (exists (
        select 1 from public.bh360_memberships m
        where m.workspace_id = bh360_vehicles.workspace_id and m.user_id = (select auth.uid())
          and m.role in ('owner','manager','operator')
    ));

create policy bh360_leads_member_read on public.bh360_leads
    for select to authenticated
    using (exists (
        select 1 from public.bh360_memberships m
        where m.workspace_id = bh360_leads.workspace_id and m.user_id = (select auth.uid())
    ));
create policy bh360_leads_staff_insert on public.bh360_leads
    for insert to authenticated
    with check (created_by = (select auth.uid()) and exists (
        select 1 from public.bh360_memberships m
        where m.workspace_id = bh360_leads.workspace_id and m.user_id = (select auth.uid())
          and m.role in ('owner','manager','operator')
    ));
create policy bh360_leads_staff_update on public.bh360_leads
    for update to authenticated
    using (exists (
        select 1 from public.bh360_memberships m
        where m.workspace_id = bh360_leads.workspace_id and m.user_id = (select auth.uid())
          and m.role in ('owner','manager','operator')
    ))
    with check (exists (
        select 1 from public.bh360_memberships m
        where m.workspace_id = bh360_leads.workspace_id and m.user_id = (select auth.uid())
          and m.role in ('owner','manager','operator')
    ));

create policy bh360_activities_member_read on public.bh360_activities
    for select to authenticated
    using (exists (
        select 1 from public.bh360_memberships m
        where m.workspace_id = bh360_activities.workspace_id and m.user_id = (select auth.uid())
    ));
create policy bh360_activities_staff_insert on public.bh360_activities
    for insert to authenticated
    with check (actor_id = (select auth.uid()) and exists (
        select 1 from public.bh360_memberships m
        where m.workspace_id = bh360_activities.workspace_id and m.user_id = (select auth.uid())
          and m.role in ('owner','manager','operator')
    ));

-- Przy wyłączonym RLS role anon nadal nie otrzymują żadnych praw.
revoke all on public.bh360_workspaces,
    public.bh360_memberships,
    public.bh360_clients,
    public.bh360_vehicles,
    public.bh360_leads,
    public.bh360_activities
    from anon, public;

grant select on public.bh360_workspaces,
    public.bh360_memberships to authenticated;
grant select, insert, update on public.bh360_clients,
    public.bh360_vehicles,
    public.bh360_leads to authenticated;
grant select, insert on public.bh360_activities to authenticated;

commit;
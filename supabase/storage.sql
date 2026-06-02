insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'ganadex-media',
  'ganadex-media',
  true,
  52428800,
  array['image/jpeg','image/png','image/webp','image/gif','video/mp4','video/webm']
);

create policy "storage_select" on storage.objects
  for select using (bucket_id = 'ganadex-media');

create policy "storage_insert" on storage.objects
  for insert with check (
    bucket_id = 'ganadex-media'
    and auth.role() = 'authenticated'
  );

create policy "storage_update" on storage.objects
  for update using (
    bucket_id = 'ganadex-media'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

create policy "storage_delete" on storage.objects
  for delete using (
    bucket_id = 'ganadex-media'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

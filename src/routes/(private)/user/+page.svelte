<script lang="ts">
	import { goto } from '$app/navigation';
	import { getUsers } from '$lib/api/userApi';
  import Spinner from '$lib/components/Spinner.svelte';
	import { createQuery } from '@tanstack/svelte-query';

  let limit = 5;
  let page = 1;
  
  // Reactive statement: Mỗi khi `params` thay đổi, query sẽ gọi lại
  $: userQuery = createQuery({
    queryKey: ['users', limit, page],
    queryFn: () => getUsers({ limit, page }),
  });

  // Function để chuyển trang
  const nextPage = () => {
    page += 1;
  };

  const prevPage = () => {
    page -= 1;
  };

  const handleView = (id: number) => {
    goto(`/user/${id}`);
  }

</script>

<div class="container mx-auto mt-8 flex-1 flex">
  <div class="card w-full bg-base-100 shadow-lg h-fit">
    <div class="card-body">
      <h2 class="card-title text-2xl mb-4">User List</h2>

      <!-- Sử dụng svelte:await để xử lý promise -->
      <!-- {#await data.promise}
          <Spinner />

        {:then data}
          {#if data.users.length > 0} 
            <div class="overflow-x-auto">
              <table class="table w-full">
                <thead>
                  <tr>
                    <th class="bg-neutral text-white">Label</th>
                    <th class="bg-neutral text-white">Value</th>
                    <th class="bg-neutral text-white">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {#each data.users as user}
                    <tr>
                      <td>{user.label}</td>
                      <td>{user.value}</td>
                      <td>
                        <div class="flex gap-2">
                          <button class="btn btn-sm btn-primary">View</button>
                          <button class="btn btn-sm btn-secondary">Edit</button>
                          <button class="btn btn-sm btn-error">Delete</button>
                        </div>
                      </td>
                    </tr>
                  {/each}
                </tbody>
              </table>
            </div>
          {:else}
            <p class="text-center text-red-500 mt-4">No users found.</p>
          {/if}
        {:catch error}
          <p class="text-center text-red-500 mt-4">
            Failed to load users: {error.message}
          </p>
      {/await} -->
     

      {#if $userQuery.status === 'pending'}
        <Spinner />
      {:else}
        {#if $userQuery.data?.users.length > 0}
          <div class="overflow-x-auto">
            <table class="table w-full">
              <thead>
                <tr>
                  <th class="bg-neutral text-white">Label</th>
                  <th class="bg-neutral text-white">Value</th>
                  <th class="bg-neutral text-white">Actions</th>
                </tr>
              </thead>
              <tbody>
                {#each $userQuery.data?.users as user, index}
                  <tr>
                    <td>{user.label}</td>
                    <td>{user.value}</td>
                    <td>
                      <div class="flex gap-2">
                        <button class="btn btn-sm btn-primary" on:click={() => handleView((page - 1) * limit + index)}>View</button>
                        <button class="btn btn-sm btn-secondary">Edit</button>
                        <button class="btn btn-sm btn-error">Delete</button>
                      </div>
                    </td>
                  </tr>
                {/each}
              </tbody>
            </table>
          </div>  
        {:else}
          <p class="text-center text-red-500 mt-4">No users found.</p>
        {/if}
      {/if}
      <!-- Pagination Controls -->
      <div class="mt-4 flex gap-4">
        <button class="btn btn-secondary" on:click={prevPage} disabled={$userQuery.data?.pagination.first}>
          Previous
        </button>
        <button class="btn btn-primary" on:click={nextPage} disabled={$userQuery.data?.pagination.last}>
          Next
        </button>
      </div>
    </div>
  </div>
</div>

<script lang="ts">
	import Spinner from "$lib/components/Spinner.svelte";

    export let data: {
        user: Promise<{
            id: number;
            name: string;
            email: string;
            phone: string;
        }>
    }
    console.log(data.user);
</script>

<div class="flex flex-col items-center p-10 flex-1">
    <div class="card w-full md:w-1/2 bg-zinc-700 shadow-xl">
        <div class="card-body">
            <h2 class="card-title text-2xl mb-4">User Detail</h2>

            {#await data.user}
                <!-- Hiển thị trạng thái loading -->
                <Spinner />
            {:then userData}
                <!-- Hiển thị khi Promise hoàn thành -->
                <div class="grid grid-cols-2 gap-4 mb-4">
                    <div class="flex flex-col">
                        <span class="text-sm font-bold">Name:</span>
                        <span class="text-lg">{userData.name}</span>
                    </div>
                    <div class="flex flex-col">
                        <span class="text-sm font-bold">Email:</span>
                        <span class="text-lg">{userData.email}</span>
                    </div>
                    <div class="flex flex-col">
                        <span class="text-sm font-bold">Phone:</span>
                        <span class="text-lg">{userData.phone}</span>
                    </div>
                    <div class="flex flex-col">
                        <span class="text-sm font-bold">ID:</span>
                        <span class="text-lg">{userData.id}</span>
                    </div>
                </div>
            {/await}

            <div class="card-actions justify-end">
                <button class="btn btn-primary" on:click={() => history.back()}>
                    Back
                </button>
            </div>
        </div>
    </div>
</div>

<script lang="ts">
    export let data: {
        user: {
            id: number;
            name: string;
            email: string;
            phone: string;
        }
    };
</script>

<div class="flex flex-col items-center p-10 flex-1">
    <div class="card w-full md:w-1/2 bg-base-100 shadow-xl">
        <div class="card-body">
            <h2 class="card-title text-2xl mb-4">User Detail</h2>

            <div class="grid grid-cols-2 gap-4 mb-4">
                <div class="flex flex-col">
                    <span class="text-sm font-bold">Name:</span>
                    <span class="text-lg">{data.user.name}</span>
                </div>
                <div class="flex flex-col">
                    <span class="text-sm font-bold">Email:</span>
                    <span class="text-lg">{data.user.email}</span>
                </div>
                <div class="flex flex-col">
                    <span class="text-sm font-bold">Phone:</span>
                    <span class="text-lg">{data.user.phone}</span>
                </div>
                <div class="flex flex-col">
                    <span class="text-sm font-bold">ID:</span>
                    <span class="text-lg">{data.user.id}</span>
                </div>
            </div>

            <div class="card-actions justify-end">
                <button class="btn btn-primary" on:click={() => history.back()}>
                    Back
                </button>
            </div>
        </div>
    </div>
</div>

<script lang="ts">
    import FormAuth from "$lib/components/FormAuth.svelte";
	import { useUpdateUser } from "$lib/query-hooks/useAuth";
	import { userStore } from "$lib/stores/userStore";
	import type { User } from "$lib/types/authType";
	import { get } from "svelte/store";

    const updateUserMutation = useUpdateUser();

    const handleSubmit = (event: CustomEvent<User>) => {
        console.log(event.detail);
        get(updateUserMutation).mutate(event.detail);
    }
</script>

<div class="flex-1 flex flex-col items-center justify-center">
    <FormAuth mode="update" on:submit={handleSubmit} isLoading={$updateUserMutation.isPending} />
</div>
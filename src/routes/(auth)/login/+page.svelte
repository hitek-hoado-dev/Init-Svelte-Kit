<script lang="ts">
    import FormAuth from "../../../lib/components/FormAuth.svelte";
    import { useLogin } from "$lib/query-hooks/useAuth";
	import { get } from "svelte/store";

    const loginMutation = useLogin();   

    const handleLogin = (event: CustomEvent<{ email: string, password: string }>) => {
        const payload = event.detail;
        get(loginMutation).mutate(payload);
    }

</script>

<FormAuth mode="login" on:submit={handleLogin} isLoading={$loginMutation.status === 'pending'} />
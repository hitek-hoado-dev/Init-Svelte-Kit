<script lang="ts">
    import FormAuth from "../../../lib/components/FormAuth.svelte";

    const handleSignup = (event: CustomEvent<{ email: string, password: string, name: string, confirmPassword: string }>) => {
        const payload = event.detail;
        console.log(payload);
    }
</script>

<FormAuth mode="signup" on:submit={handleSignup} />
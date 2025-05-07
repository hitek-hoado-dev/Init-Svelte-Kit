<script lang="ts">
	import { page } from '$app/state';
</script>

<div>
    {page?.status}: {page?.error?.message}
</div>

<style>
    div {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-grow: 1;
        font-size: 2rem;
        font-weight: bold;
        color: red;
    }
</style>
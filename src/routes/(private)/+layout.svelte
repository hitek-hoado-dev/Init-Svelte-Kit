<script lang="ts">
	import type { User } from "$lib/types/authType";
	import Header from "../../lib/components/Header.svelte";
	import { userStore } from "$lib/stores/userStore";
	import { get } from 'svelte/store';

	export let data: { user: User };

	// Set user store chỉ khi F5 store là null
	$: if (get(userStore) === null && data.user) {
		userStore.set(data.user);
	}


</script>
<div class="flex-1 flex flex-col">
	<Header />

	<slot/>

	<footer>
		<p class="text-center text-black">
			Default Footer
		</p>
	</footer>
</div>

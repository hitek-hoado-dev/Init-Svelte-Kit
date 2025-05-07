<script lang="ts">
	import { QueryClient, QueryClientProvider, hydrate } from '@tanstack/svelte-query';
	import { browser } from '$app/environment';
	export let data: { dehydratedState?: any };
	import "../app.css"

	// 1. Tạo QueryClient duy nhất cho cả ứng dụng
	const queryClient = new QueryClient();

	// 2. Nếu có SSR-dehydrated state, hydrate nó vào client
	if (browser && data.dehydratedState) {
		hydrate(queryClient, data.dehydratedState);
	}
</script>

<div class="flex flex-col min-h-screen">
	<QueryClientProvider client={queryClient}>
		<slot/>
	</QueryClientProvider>
</div>

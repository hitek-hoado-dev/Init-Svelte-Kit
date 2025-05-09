<script lang="ts">
	import { page } from '$app/state';
	import { STORAGES } from '$lib/constants/storage';
	import logo from '$lib/images/svelte-logo.svg';
	import { deleteCookie } from '$lib/utils/cookie';
	import { APP_ROUTES } from '$lib/constants/routes';
	import { goto } from '$app/navigation';
	import { userStore } from '$lib/stores/userStore';

	const handleLogout = () => {
		deleteCookie(STORAGES.ACCESS_TOKEN);
		goto(APP_ROUTES.LOGIN);
	}

	$: if ($userStore) {
		console.log('User updated:', $userStore);
	}

</script>

<header class="p-3">
	<div class="corner">
		<a href={APP_ROUTES.HOME}>
			<img src={logo} alt="SvelteKit" width="50" height="50" />
		</a>
	</div>

	<nav>
		<svg viewBox="0 0 2 3" aria-hidden="true">
			<path d="M0,0 L1,2 C1.5,3 1.5,3 2,3 L2,0 Z" />
		</svg>
		<ul>
			<li aria-current={page.url.pathname === '/' ? 'page' : undefined}>
				<a href="/">Home</a>
			</li>
			<li aria-current={page.url.pathname === '/about' ? 'page' : undefined}>
				<a href="/about">About</a>
			</li>
			<li aria-current={page.url.pathname.startsWith(APP_ROUTES.PROFILE) ? 'page' : undefined}>
				<a href={APP_ROUTES.PROFILE}>Profile</a>
			</li>
			<li aria-current={page.url.pathname.startsWith(APP_ROUTES.USER) ? 'page' : undefined}>
				<a href={APP_ROUTES.USER}>User</a>
			</li>
		</ul>
		<svg viewBox="0 0 2 3" aria-hidden="true">
			<path d="M0,0 L0,3 C0.5,3 0.5,3 1,2 L2,0 Z" />
		</svg>
	</nav>

	
	<div class="corner flex items-center gap-2">

		<p class="text-black">{$userStore?.name}</p>

		<button class="btn btn-primary" onclick={handleLogout}>
			Logout
		</button>

	</div>
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
		position: relative;
	}

	nav {
		display: flex;
		justify-content: center;
		--background: rgba(255, 255, 255, 0.7);
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}

	svg {
		width: 2em;
		height: 3em;
		display: block;
	}

	path {
		fill: var(--background);
	}

	ul {
		position: relative;
		padding: 0;
		margin: 0;
		height: 3em;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		background: var(--background);
		background-size: contain;
	}

	li {
		position: relative;
		height: 100%;
		color: black;
	}

	li[aria-current='page']::before {
		--size: 6px;
		content: '';
		width: 0;
		height: 0;
		position: absolute;
		top: 0;
		left: calc(50% - var(--size));
		border: var(--size) solid transparent;
		border-top: var(--size) solid var(--color-theme-1);
	}

	li[aria-current='page'] a {
		color: var(--color-theme-1);
	}

	nav a {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 0.5rem;
		color: black;
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
		transition: color 0.2s linear;
	}

	a:hover {
		color: var(--color-theme-1);
	}
</style>

<script lang="ts">
    import { createEventDispatcher, onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { userStore } from '$lib/stores/userStore';
    import { passwordPattern } from '$lib/constants/regex';

    export let mode: 'login' | 'signup' | "update" = 'login';
    export let isLoading: boolean = false;
  
    const dispatch = createEventDispatcher();
  
    type Payload = {
        email: string;
        password?: string;
        name?: string;
        confirmPassword?: string;
    }

    // ✅ Gom state vào object
    let formValue: Payload = {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    };

    let isShowPassword: boolean = false;

    // ✅ Gán user vào formValue nếu mode là update
    onMount(() => {
      if (mode === 'update') {
        const unsubscribe = userStore.subscribe((user) => {
          if (user) {
            formValue = user as Payload
          }
        });
        return unsubscribe;
      }
    });

    let confirmInput: HTMLInputElement;

    // Mỗi khi password hoặc confirmPassword thay đổi, validate
    $: if (mode === 'signup' && confirmInput) {
      if (formValue.confirmPassword === '') {
        confirmInput.setCustomValidity('');
      } else if (formValue.confirmPassword !== formValue.password) {
        confirmInput.setCustomValidity('Passwords do not match');
      } else {
        confirmInput.setCustomValidity(''); // OK
      }
    }

    function handleSubmit() {
      const payload: Payload = { email: formValue.email, password: formValue.password };
      if (mode === 'signup') {
        payload['name'] = formValue.name;
        payload['confirmPassword'] = formValue.confirmPassword;
      }
      if(mode === 'update') {
        payload['name'] = formValue.name;
        payload['email'] = formValue.email;
      }
      dispatch('submit', payload);
    }
  </script>
  
  <div class="max-w-md mx-auto mt-8">
    <div class="card w-[500px] shadow-lg bg-base-100">
      <div class="card-body">
        <h2 class="card-title text-center text-2xl font-bold mx-auto">
          {#if mode === 'login'}
            Login
          {:else if (mode === 'signup')}
            Sign Up
          {:else if (mode === 'update')}
            Update
          {/if}
        </h2>
        <form on:submit|preventDefault={handleSubmit} class="space-y-4">
          {#if mode === 'signup' || mode === 'update'}
            <div class="form-control flex flex-col gap-3 items-stretch">
              <label class="label">
                <span class="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Your name"
                class="input w-full validator"
                bind:value={formValue.name}
                required
                minlength={3}
              />
              <p class="validator-hint hidden">
                Name must be at least 3 characters long
              </p>
            </div>
          {/if}
  
          <div class="form-control flex flex-col gap-3 items-stretch">
            <label class="label">
              <span class="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              class="input w-full validator"
              bind:value={formValue.email}
              required
            />
            <p class="validator-hint hidden">
              Please enter a valid email address
            </p>
          </div>
          
          {#if mode !== 'update'}
            <div class="form-control flex flex-col gap-3 items-stretch">
              <label class="label">
                <span class="label-text">Password</span>
              </label>
              <input
                type={isShowPassword ? 'text' : 'password'}
                placeholder="********"
                class="input w-full validator"
                bind:value={formValue.password}
                required
                minlength={8}
                pattern={passwordPattern}
                title="Must be more than 8 characters, including at least one number, one lowercase letter, and one uppercase letter"
                
              />
              <p class="validator-hint hidden">
                Must be more than 8 characters, including
                <br/>At least one number
                <br/>At least one lowercase letter
                <br/>At least one uppercase letter
              </p>
            </div>
          {/if}
  
          {#if mode === 'signup'}
            <div class="form-control flex flex-col gap-3 items-stretch">
              <label class="label">
                <span class="label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                bind:this={confirmInput}
                placeholder="********"
                class="input w-full validator"
                bind:value={formValue.confirmPassword}
                required
              />
              <p class="validator-hint hidden">
                Passwords must match
              </p>
            </div>
          {/if}
  
          <div class="form-control mt-6">
            <button type="submit" class="btn btn-primary hover:btn-secondary w-full" disabled={isLoading}>
              {#if isLoading}
                <span class="loading loading-spinner loading-lg"></span>
              {:else if (mode === 'login')  }
                Login
              {:else if (mode === 'signup')}
                Sign Up
              {:else if (mode === 'update')}
                Update
              {/if}
            </button>
          </div>

          {#if mode === 'login'}
            <a href="/signup" on:click|preventDefault={() => goto('/signup')} class="btn btn-link hover:btn-secondary w-full">
              Don't have an account? Sign Up
            </a>
          {:else if (mode === 'signup')}
            <a href="/login" on:click|preventDefault={() => goto('/login')} class="btn btn-link hover:btn-secondary w-full">
              Already have an account? Login
            </a>
          {/if}
        </form>
      </div>
    </div>
  </div>
  
  <style>
    /* Optional: override daisyUI theme colors if needed */
  </style>
  
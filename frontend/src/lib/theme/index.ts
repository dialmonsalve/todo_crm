document.addEventListener('astro:after-swap', () => {
  const getTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme;

    return window.matchMedia('(prefers-color-scheme: dark)').matches 
      ? 'dark' 
      : 'light';
  };  
  const theme = getTheme();
  document.documentElement.setAttribute('data-theme', theme);
});
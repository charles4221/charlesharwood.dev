/**
 * Set the theme globally by applying a class to the document (`<html>`) element.
 *
 * This might technically break the "rules" of React, since we're directly manipulating
 * the DOM outside of React's control, but doing it this way means we can switch between
 * light and dark modes without any flicker or delay, and without any re-rendering of components.
 *
 * It is also essentially the same as how React are doing it on their own documentation website,
 * so I think it's a fair compromise.
 */
export function setThemeOnDocument(newTheme: 'dark' | 'light') {
  if (newTheme === 'dark') {
    document.documentElement.classList.add('dark');
  } else if (newTheme === 'light') {
    document.documentElement.classList.remove('dark');
  }
}

import { gsap } from 'gsap';

export function transitionAnimationLeave(next: () => void) {
  console.log('TRANSITION: leaving');
  const tween = gsap.fromTo(
    'main',
    { autoAlpha: 1, y: 0 },
    { autoAlpha: 0, y: -20, duration: 0.2, onComplete: next },
  );

  return () => tween.kill();
}

export function transitionAnimationEnter(next: () => void) {
  console.log('TRANSITION: entering');
  const tween = gsap.fromTo(
    'main',
    { autoAlpha: 0, y: -20 },
    { autoAlpha: 1, y: 0, duration: 0.2, onComplete: next },
  );

  return () => tween.kill();
}
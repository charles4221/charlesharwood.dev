import { gsap } from 'gsap';

import {
  transitionAnimationLeave,
  transitionAnimationEnter,
} from '../transition-animations';

jest.mock('gsap');

describe('transitionAnimationLeave', () => {
  it('should animate and call next on complete', () => {
    const next = jest.fn();
    const kill = jest.fn();
    const fromTo = jest
      .spyOn(gsap, 'fromTo')
      .mockReturnValue({ kill } as unknown as gsap.core.Tween);

    const cancel = transitionAnimationLeave(next);

    expect(fromTo).toHaveBeenCalledWith(
      'main',
      { autoAlpha: 1, y: 0 },
      { autoAlpha: 0, y: -20, duration: 0.2, onComplete: next },
    );

    cancel();
    expect(kill).toHaveBeenCalled();
  });
});

describe('transitionAnimationEnter', () => {
  it('should animate and call next on complete', () => {
    const next = jest.fn();
    const kill = jest.fn();
    const fromTo = jest
      .spyOn(gsap, 'fromTo')
      .mockReturnValue({ kill } as unknown as gsap.core.Tween);

    const cancel = transitionAnimationEnter(next);

    expect(fromTo).toHaveBeenCalledWith(
      'main',
      { autoAlpha: 0, y: -20 },
      { autoAlpha: 1, y: 0, duration: 0.2, onComplete: next },
    );

    cancel();
    expect(kill).toHaveBeenCalled();
  });
});

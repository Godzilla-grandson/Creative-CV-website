declare module 'gsap/SplitText' {
  export interface SplitTextConfig {
    type?: string;
    charsClass?: string;
    wordsClass?: string;
    linesClass?: string;
  }

  export class SplitText {
    constructor(target: any, config?: SplitTextConfig);
    chars: HTMLElement[];
    words: HTMLElement[];
    lines: HTMLElement[];
    revert(): void;
  }
}

declare module 'gsap/ScrollSmoother' {
  export class ScrollSmoother {
    static create(config?: any): ScrollSmoother;
    static refresh(force?: boolean): void;
    paused(value?: boolean): boolean;
    scrollTop(value?: number): number;
    scrollTo(target: string | number | HTMLElement, smooth?: boolean, position?: string): void;
  }
}

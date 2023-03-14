/**
 * Create debounced function
 * @param fn debounced function callback
 * @param delay debounce delay
 * @returns function wrapper
 */
const debounce = (fn: Function, delay: number = 500) => {
  let timer: number;

  return (...args: any[]) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

export default debounce;

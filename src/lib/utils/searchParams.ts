const addSearchParam = (name: string, value: string) => {
  const currentParams = new URLSearchParams(window.location.search);

  const formattedParams: string[] = [];
  currentParams.forEach((value, key) => {
    if (key !== 'unread') {
      formattedParams.push(`${key}=${value}`);
    }
  });

  window.history.pushState(
    {},
    '',

    `/inbox?${formattedParams.join('&')}&${name}=${value}`,
  );
};

const removeSearchParam = (name: string) => {
  const currentParams = new URLSearchParams(window.location.search);

  const formattedParams: string[] = [];
  currentParams.forEach((value, key) => {
    if (key !== name) {
      formattedParams.push(`${key}=${value}`);
    }
  });

  window.history.pushState({}, '', `/inbox?${formattedParams.join('&')}`);
};

const setSearchParam = (name: string, value: string) => {
  const currentParams = new URLSearchParams(window.location.search);

  currentParams.set(name, value);

  window.history.pushState({}, '', `/inbox?${currentParams.toString()}`);
};

export { addSearchParam, removeSearchParam, setSearchParam };

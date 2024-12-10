// src/utils/imageMapper.ts

const importImages = () => {
    const images: { [key: string]: string } = {};
    const modules = import.meta.glob('../assets/*.{jpg,jpeg,png,gif,svg}', { eager: true });

    for (const path in modules) {
      const key = path.replace('../assets/', '');
      images[key] = (modules[path] as { default: string }).default;
    }

    return images;
  };

  export const images = importImages();

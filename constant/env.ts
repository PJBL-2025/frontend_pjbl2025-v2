const getEnv = (name: string) => {
    const value = process.env[name]

    if (!value) {
      throw new Error(`Missing ENV: ${value}`);
    }

    return value
}

export const STORAGE_KEY = getEnv('EXPO_PUBLIC_STORAGE_KEY');
export const API_URL = getEnv('EXPO_PUBLIC_API_URL');
export const API_CLOUDINARY = getEnv('EXPO_PUBLIC_API_CLOUDINARY');
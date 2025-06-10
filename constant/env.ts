const getEnv = (name: string) => {
    const value = process.env[name]

    if (!value) {
      throw new Error(`Missing ENV: ${value}`);
    }

    return value
}

export const STORAGE_KEY = getEnv('EXPO_PUBLIC_STORAGE_KEY');
export const API_URL_NODE = getEnv('EXPO_PUBLIC_API_URL_NODE');
export const API_URL_GO = getEnv('EXPO_PUBLIC_API_URL_GO');
export const API_CLOUDINARY = getEnv('EXPO_PUBLIC_API_CLOUDINARY');
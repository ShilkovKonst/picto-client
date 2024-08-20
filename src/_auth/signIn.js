export const signIn = async (authType, formData) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/signIn`, {
        method: "POST",
        body: formData,
      }).catch((e) => {
        throw new Error("Failed to create data: " + e.message);
      });
      return response.data;
    } catch (error) {
      throw new Error(`Authentication failed: ${error.message}`);
    }
  };
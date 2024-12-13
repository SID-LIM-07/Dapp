// Simulating API calls using local storage

export async function fetchApi(endpoint: string, options: RequestInit = {}) {
  const method = options.method || 'GET';
  const body = options.body ? JSON.parse(options.body as string) : null;

  switch (endpoint) {
    case 'login':
      return simulateLogin(body);
    case 'profile':
      if (method === 'GET') {
        return getProfile(body?.username);
      } else if (method === 'PUT') {
        return updateProfile(body);
      }
    default:
      throw new Error(`Unhandled endpoint: ${endpoint}`);
  }
}

function simulateLogin(credentials: { username: string; password: string }) {
  const users = JSON.parse(localStorage.getItem('users') || '{}');
  const user = users[credentials.username];

  if (user && user.password === credentials.password) {
    return { success: true, user: { ...user, password: undefined } };
  } else {
    return { success: false, error: 'Invalid credentials' };
  }
}

function getProfile(username: string) {
  const users = JSON.parse(localStorage.getItem('users') || '{}');
  const user = users[username];

  if (user) {
    return { ...user, password: undefined };
  } else {
    throw new Error('User not found');
  }
}

function updateProfile(userData: any) {
  const users = JSON.parse(localStorage.getItem('users') || '{}');
  users[userData.username] = { ...users[userData.username], ...userData };
  localStorage.setItem('users', JSON.stringify(users));
  return { ...userData, password: undefined };
}

export async function uploadImage(file: File) {
  return new Promise<{ url: string }>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve({ url: reader.result as string });
    };
    reader.readAsDataURL(file);
  });
}


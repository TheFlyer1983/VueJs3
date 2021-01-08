interface RootStore {
  auth: AuthStore;
  coaches: CoachesStore;
  requests: RequestsStore
}

interface AuthStore {
  userId: string;
  token: string;
  didAutoLogout: boolean;
}

interface CoachesStore {
  lastFetch: number;
  coaches: Coach[];
}

interface Coach {
  id: string;
  firstName: string;
  lastName: string;
  areas: Array<string>;
  description: string;
  hourlyRate: number;
}

interface RequestsStore {
  requests: Request[];
}

interface Request {
  id: string;
  coachId: string;
  message: string;
  userEmail: string;
}

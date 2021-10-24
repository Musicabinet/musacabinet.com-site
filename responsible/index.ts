import { CollectionI, CourseI, ModuleI, ServiceI } from '../interfaces';
import { GroupLessonI } from '../interfaces/group-lesson';

export * from './auth';

export interface FacebookClientResponsive {
  accessToken: string;
  data_access_expiration_time: number;
  expiresIn: number;
  graphDomain: string;
  id: string;
  name: string;
  signedRequest: string;
  userID: string;
}

export interface GrandChartResponse {
  courses: CourseI[];
  modules: ModuleI[];
  collections: CollectionI[];
  group_lessons: GroupLessonI[];
}

export interface ServiceListResponse {
  success: boolean;
  data: ServiceI[];
}

export interface UploadAvatarResponse {
  path: string;
}

export interface DefaultResponse {
  success: boolean;
  errors?: string[];
}

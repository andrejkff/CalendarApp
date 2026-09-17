export interface ICreateEventPayload {
  name: string;
  description: string;
  startDate: number;
  startMonth: number;
  startYear: number;
  startHours: number;
};

export interface IEventView extends ICreateEventPayload {
  createdAt: string;
  userId: string;
  id: string;
}

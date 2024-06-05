
interface Event {
  id: number;
  title: string;
  description: string;
  start_date: Date;
  end_date: Date;
  user_id: string; 
  status: string;
  slug: string;
  thumbnail: string;
  created_at: Date;
  updated_at: Date;
  organization_id: number;
  organization: string;
  author: string;
  max_registration: number;
  total_registered: number;
}

export default Event;

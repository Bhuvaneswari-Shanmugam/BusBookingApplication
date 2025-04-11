


export interface MenuItem {
    path: string;
    label: string;
    icon: React.ReactNode; 
}

export interface CustomerInterface {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    gender:string;
    age:number;
  }


   interface Point {
    location: string;
    time: string;
  }
  
 export interface PointsTableProps {
    points: Point[];
    title: string;
    onAddPoint: () => void;
    onRemovePoint: (index: number) => void;
    onChange: (index: number, field: string, value: string) => void;
  }
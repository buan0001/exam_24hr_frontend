export type Participant = {
  id?: number;
  name: string;
  age: number;
  ageGroup: string;
  birthDate?: string;
  gender: string;
  club: string;

  results: Result[];
  disciplines: Discipline[];


  [key: string]: any;
};

export type Result = {
  id?: number;
  date: string;
  resultValue: number;
  discipline: Discipline;
};

export type Discipline = {
  
  name: string;
  resultType?: string;
};

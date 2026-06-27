export interface Course {
    "id": string,
    "courseName": string,
    "instructor": string,
    "category": string,
    "duration": number,
    "price": number,
    "description": string,
    "status": {
        id:string,
        label:string
    },
    "createdDate": string
}
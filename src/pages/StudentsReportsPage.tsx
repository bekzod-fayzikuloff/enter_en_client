import {useEffect, useState} from "react";
import {getResponse} from "../utils";
import {studentsListUrl} from "../constants/endpoints";

type Student = {
  id: number;
  first_name: string,
  last_name: string;
  surname: string;
  group: {
    id: number;
    title: string;
  }
}

type StudentReport = {
  avg_grades: {pk: number, title: string, avg: number}[],
} & Student

const Report = (props: {id: number}) => {
  const [report, setReport] = useState<StudentReport>()

  useEffect(() => {
    getResponse('get', `${studentsListUrl}${props.id}/reports/`, {}).then(r => {
      console.log(r)
      setReport(r.data)
    })
  }, [props.id])

  return (
    <div>
      <p>Group: {report?.group.title}</p>
      <p>FullName: {report?.first_name} {report?.last_name} {report?.surname}</p>
      {report?.avg_grades.map(grade => {
        return (
          <div key={grade.pk}>Subject: {grade.title} ({grade.avg})</div>
        )
      })}
    </div>
  )
}


const StudentCard = (props: {student: Student}) => {
  const {student} = props
  const [isOpen, setIsOpen] = useState(false)
  return (
    <li
      onClick={() => setIsOpen(prevState => !prevState)}
      className={`list-group-item ${isOpen ? 'open active' : 'close'}`}
    >
      {student.first_name}
      {
        isOpen && <Report id={student.id} />
      }
    </li>
  )
}

export const StudentsReportsPage = () => {
  const [studentsData, setStudentsData] = useState<Student[]>([])

  useEffect(() => {
    getResponse('get', studentsListUrl, {}).then(r => {
      setStudentsData(r.data.results)
    })
  }, [])

  return (
    <ul className="list-group">
      {
        studentsData.map(student => <StudentCard key={student.id} student={student} />)
      }
    </ul>
  )
}
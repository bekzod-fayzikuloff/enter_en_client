import {useEffect, useState} from "react";
import {getResponse} from "../utils";
import {groupsListUrl} from "../constants/endpoints";


type Group = {
  id: number;
  title: string
}

type GroupReport = {
  avg_grades: {
    subject: string;
    avg: number
  } []
} & Group


const Report = (props: {id: number}) => {
  const [report, setReport] = useState<GroupReport>()

  useEffect(() => {
    getResponse('get', `${groupsListUrl}${props.id}/reports/`, {}).then(r => {
      setReport(r.data)
    })
  }, [props.id])

  return (
    <div>
      <p>Group: {report?.title}</p>
      {report?.avg_grades.map((grade, key) => {
        return (
          <div key={key}>Subject: {grade.subject} ({grade.avg})</div>
        )
      })}
    </div>
  )
}

const GroupCard = (props: {group: Group}) => {
  const {group} = props
  const [isOpen, setIsOpen] = useState(false)
  return (
    <li
      onClick={() => setIsOpen(prevState => !prevState)}
      className={`list-group-item ${isOpen ? 'open active' : 'close'}`}
    >
      {group.title}
      {
        isOpen && <Report id={group.id} />
      }
    </li>
  )
}



export const GroupsReportsPage = () => {
  const [groups, setGroups] = useState<Group[]>([])

  useEffect(() => {
    getResponse('get', groupsListUrl, {}).then(r => {
      setGroups(r.data.results)
    })
  }, [])

  return (
    <ul className="list-group">
      {
        groups.map(group => <GroupCard key={group.id} group={group} />)
      }
    </ul>
  )
}
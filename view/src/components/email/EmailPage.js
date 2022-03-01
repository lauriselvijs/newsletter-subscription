import React, { useState, useEffect } from "react"
import EmailInfo from "./EmailInfo"
import "../../styles/css/email-page.css"
import axios from "axios"
import EmailButton from "./EmailButton"
import { Link } from "react-router-dom"
import { CSVLink } from "react-csv"

function EmailPage () {
  const [emailData, setEmailData] = useState([])
  const [sortOrder, setSortOrder] = useState("asc")
  const [orderBy, setOrderBy] = useState("created_at")
  const [groupBy, setGroupBy] = useState("")
  const [searchText, setSearchText] = useState("")
  const [activeNameBtn, setActiveNameBtn] = useState(false)
  const [activeDateBtn, setActiveDateBtn] = useState(true)
  const [emailList, setEmailList] = useState([])

  const fetchData = async () => {
    const hostname = window.location.hostname
    const protocol = window.location.protocol

    try {
      const newEmailData = await axios.get(
        `${protocol}//${hostname}/emails/public/`,
        {
          params: {
            search: searchText,
            order_by: orderBy,
            order: sortOrder,
            email_filter: groupBy
          }
        }
      )

      setEmailData(newEmailData.data)
    } catch (error) {
      console.log(error)

      return error
    }
  }

  const filterDataByEmail = async () => {
    const hostname = window.location.hostname
    const protocol = window.location.protocol

    try {
      const emailList = await axios.get(
        `${protocol}//${hostname}/emails/public/`
      )
      setEmailList(emailList.data)
    } catch (error) {
      console.log(error)

      return error
    }
  }

  useEffect(() => {
    fetchData()
    filterDataByEmail()
  }, [orderBy, searchText, groupBy])

  const deleteNote = async (emailID) => {
    const newEmailData = emailData.filter((email) => email.id !== emailID)
    setEmailData(newEmailData)

    const hostname = window.location.hostname
    const protocol = window.location.protocol

    try {
      await axios.delete(`${protocol}//${hostname}/emails/public/`, {
        params: { email_id: emailID }
      })
    } catch (error) {
      console.log(error)

      return error
    }
  }

  const onSortbyName = () => {
    setOrderBy("email_name")
    setActiveDateBtn(false)
    setActiveNameBtn(true)
  }

  const onSortbyDate = () => {
    setOrderBy("created_at")
    setActiveDateBtn(true)
    setActiveNameBtn(false)
  }

  const searchEmail = () => {
    setSearchText(searchText)
    console.log(searchText)
  }

  const setFiltreByEmail = (buttonName) => {
    setGroupBy(buttonName)
  }

  const onClear = () => {
    setGroupBy("")
    setSearchText("")
    setOrderBy("created_at")
    setActiveDateBtn(true)
    setActiveNameBtn(false)
  }

  return (
    <div>
      <h1>Emails</h1>
      <table id="customers">
        <tbody>
          <tr>
            <th>Email </th>
            <th>Date created </th>
          </tr>
          {emailData.map((email) => (
            <EmailInfo
              key={email.id}
              email={email}
              onDelete={() => deleteNote(email.id)}
            />
          ))}
        </tbody>
      </table>
      <button
        onClick={() => onSortbyName()}
        className={activeNameBtn ? "sort-by-name-active" : "sort-by-name"}
      >
        Sort by name
      </button>
      <button
        onClick={() => onSortbyDate()}
        className={activeDateBtn ? "sort-by-date-active" : "sort-by-date"}
      >
        Sort by date
      </button>
      <span className="search-area">
        <input
          type="text"
          className="search-input"
          placeholder="Search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button className="search-email" onClick={() => searchEmail()}>
          Search
        </button>
      </span>
      <button className="clear" onClick={() => onClear()}>
        Clear all
      </button>
      <CSVLink className="csv-download" data={emailData}>
        Download CSV
      </CSVLink>
      {emailList.map((email, index) => {
        const domain = email.DOMAIN.substring(0, email.DOMAIN.indexOf("."))
        const buttonName = domain.charAt(0).toUpperCase() + domain.slice(1)
        return buttonName
          ? (
          <EmailButton
            key={index}
            buttonName={buttonName}
            onFiltre={() => setFiltreByEmail(buttonName)}
          />
            )
          : (
              ""
            )
      })}
      <Link to={"/"}>
        <button className="back">Go back</button>
      </Link>
    </div>
  )
}

export default EmailPage

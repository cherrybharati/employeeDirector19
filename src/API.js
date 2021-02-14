import {useEffect, useContext} from 'react';
import axios from "axios"

export function useGet(url){
    const{employees, setEmployees} = useContext(EmployeeContext)

    useEffect(()=> {
        async function getEmployees(){
            try {
                const response = await axios.get(url)
               
                setEmployees(response.data.results)
               
            }
            catch (error) {
                console.log(error)
            }   
        }
        getEmployees()
    },[])

    function sortingFunc(sort){
        switch(sort){
            case "name":
                sortName()
                break
            case "age":
                sortAge()
                break
            default:
                console.log("sort does not match any cases")
        }
    }
    function sortName(){
         employees.sort(function(a,b){
            if(a.name.first < b.name.first){
                return -1;
            }else{
                return 1;
            }
        })
      
        setDisplayedEmployees([...employees])
    }

  
    function sortAge(){
        employees.sort(function(a,b){
            return (a.dob.age - b.dob.age)
        })
        setDisplayedEmployees([...employees])
    }

    return {displayedEmployees, sortingFunc}
}
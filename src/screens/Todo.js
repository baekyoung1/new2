import React, { useState } from 'react';
import { StatusBar, Dimensions } from "react-native";
import styled, { ThemeProvider } from 'styled-components/native'; 
import {theme, dark} from "../theme";
import Input from "../component/Input";
import Task from "../component/Task";
import AsyncStorage from "@react-native-async-storage/async-storage";


const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
  align-items: center;
  justify-content: flex-start;
`;

const Title = styled.Text`
  font-size: 30px;
  font-weight: 800;
  color:${({ theme }) => theme.main};
  align-self: flex-start;
  margin: 10px 25px;
`;

const List = styled.ScrollView`
  flex: 1;
  width: ${({ width }) => width - 40}px;
`;




const Todo=()=>{
    const width = Dimensions.get("window").width;
  

    const[tasks, setTasks] = useState({});
  
    const _saveTasks =async tasks => {
      try {
        await AsyncStorage.setItem("tasks", JASON.stringify(tasks));
        setTasks(tasks);
      } catch (e){
        //console.error(e);
      }
    };
  
    const _loadTasks = async()=>{
      const loadedTasks=await AsyncStorage.getItem("tasks");
      setTasks(JSON.parse(loadedTasks || "{}"));
    };
    const[newTask, setNewTask] = useState("");

    const _addTask =()=>{
      if (newTask.length < 1) {
        return;
      }
      const ID=Date.now().toString();
      const newTaskObject={
        [ID]:{id:ID, text:newTask, completed:false},
      }
      /*alert(`Add: ${newTask}`); */
      setNewTask('');
      setTasks({...tasks, ...newTaskObject});
    };
  
    const _deleteTask = id => {
      const currentTasks =Object.assign({}, tasks);
      delete currentTasks[id];
      setTasks(currentTasks);
    };
  
    const _toggleTask = id=>{
      const currentTasks =Object.assign({}, tasks);
      currentTasks[id]['completed'] = !currentTasks[id]['completed'];
      setTasks(currentTasks);
    };
  
    const _updateTask = item =>{
      const currentTasks =Object.assign({}, tasks);
      currentTasks[item.id]=item;
      setTasks(currentTasks);
    }
  
    /**const _handleTextChange =(text)=>{
      setNewTask(text);
    };
  
    const _onBlur=()=>{
      setNewTask("");
    };*/
    
    
    return  (
      
      
        <Container>
          <StatusBar
          barStyle="light-content"
          backgroundColor="#ffffff"/>
  
          <Input
            placeholder="+"
            value={newTask}
            onChangeText={text=>setNewTask(text)}
            onSubmitEditing={_addTask}
            onBlur={()=>setNewTask('')}
          />
  
          <List width={width}>
            {Object.values(tasks)
              .reverse()
              .map((item)=>(
                <Task
                  key={item.id}
                  item={item}
                  saveTask={_saveTasks}
                  loadTask={_loadTasks}
                  deleteTask={_deleteTask}
                  toggleTask={_toggleTask}
                  updateTask={_updateTask}
                />  
              ))}
          </List>  
        </Container>

    );
};

export default Todo;
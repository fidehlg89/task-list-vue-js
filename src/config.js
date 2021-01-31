/*export const url = 'http://localhost:5000'

const headers = {
    'Accept': 'application/json',
}

export function getAll(){
    let tasks=[]
    fetch(`${url}/tasks`, { headers })
        .then(res => res.json())
        .then(data => {
            for (let x in data) {
                var task = data[x];
                tasks.push(task);
              }
            }
        )
    return tasks
}*/

import { DBConnection } from './DBC.js';

async function Food_filter(Filter) {
    const pool = await DBConnection();
    let filter_parametrs = [[],[]];
    
    // Constructing the filter parameters
    Object.entries(Filter).forEach(([key, value]) => {
        if(value){
            filter_parametrs[0].push("'"+key+"'"); // For "IN" clause
        }else{
            filter_parametrs[1].push("'"+key+"'"); // For "NOT IN" clause
        }
    });

    let [in_id] = await pool.execute(`SELECT id FROM Food_Join WHERE name IN (${filter_parametrs[0].join(',')})`);
    let [not_in_id] = await pool.execute(`SELECT * FROM Food_Join WHERE name NOT IN (${filter_parametrs[1].join(',')})`);
    let in_id_list = in_id.map(item => item.id);
    let not_in_id_list = not_in_id.map(item => item.id);
    let result = [
        ...in_id_list.filter(x => !not_in_id_list.includes(x)), // Elements in A but not in B
        ...not_in_id_list.filter(x => !in_id_list.includes(x))  // Elements in B but not in A
    ];
    let uniqueResult = [...new Set(result)];
    console.log(uniqueResult);
    const [rows] = await pool.execute(`SELECT * FROM Food_Join WHERE id IN (${uniqueResult.join(',')})`);
    console.log(rows);
}

/* Example
Food_filter({"Slané":true,"Umami":false}) */
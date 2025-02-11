import { DBConnection } from './DBC.js';

async function Food_filter(Filter,type,vegetarian) {
    const pool = await DBConnection();
    let filter_parametrs = [[],[]];
    let filter_type = []
    
    // Constructing the filter parameters
    Object.entries(Filter).forEach(([key, value]) => {
        if(value){
            filter_parametrs[0].push("'"+key+"'"); // For "IN" clause
        }else{
            filter_parametrs[1].push("'"+key+"'"); // For "NOT IN" clause
        }
    });

    Object.entries(type).forEach(([key,value]) => {
        filter_type.push("'"+value+"'");
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
    filter_type = filter_type.map(filter_type => `${filter_type}`);
    console.log(filter_type);
    const [rows] = await pool.execute(`SELECT * FROM Food_Join WHERE id IN (${uniqueResult.join(',')}) and type in (${filter_type.join(',')}) and is_vegetarian = ${vegetarian}`);
    console.log(rows);
}


Food_filter({},["hlavní jídlo"],true)
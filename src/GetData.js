import { bill, categories } from './data';
import { format } from 'date-fns/esm';

export const getData = () => {
    return bill.map(item => {
        for (let i = 0; i < categories.length; i++ ) {
            if (item.category === categories[i].id) {
                item.category = categories[i].name;
            }
        }
        return { date: format(item.time, "yyyy年M月d日"), 
                 type: item.type === 1 ? "收入" : "支出",
                 amount: parseFloat(item.amount).toFixed(2), 
                 category: item.category
               };
    })
}

export const getCategories = () => {
    return categories.map(category => {
        return category.name
    })
}
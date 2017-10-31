module.exports = function longestConsecutiveLength(array) {
    const setLinks = new Map();
    const sets = new Map();
    array.forEach(l => {
       if(setLinks.has(l)) {
           return;
       }

       if(setLinks.has(l - 1) && setLinks.has(l + 1)) {
           let leftSet = setLinks.get(l - 1),
            rightSet = setLinks.get(l + 1);
           while(leftSet !== setLinks.get(leftSet)) leftSet = setLinks.get(leftSet);
           while(rightSet !== setLinks.get(rightSet)) rightSet = setLinks.get(rightSet);
           setLinks.set(l, leftSet);
           setLinks.set(rightSet, leftSet);
           sets.set(leftSet, sets.get(leftSet) + sets.get(rightSet) + 1);
           return;
       }

       if(setLinks.has(l - 1)) {
           let set = setLinks.get(l - 1);
           while(set !== setLinks.get(set)) set = setLinks.get(set);
           setLinks.set(l, set);
           sets.set(set, sets.get(set) + 1);

           return;
       }

       if(setLinks.has(l + 1)) {
           let set = setLinks.get(l + 1);
           while(set !== setLinks.get(set)) set = setLinks.get(set);
           setLinks.set(l, set);
           sets.set(set, sets.get(set) + 1);
           return;
       }

       setLinks.set(l, l);
       sets.set(l, 1);
    });
    const longestSetLength = Math.max(...sets.values());
    return longestSetLength > 1 ? longestSetLength : 0;
};

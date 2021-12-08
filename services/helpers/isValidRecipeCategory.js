const isValidRecipeCategory = (category) => {
    if (category.toLowerCase() === 'breakfast' || category.toLowerCase() === 'lunch' || category.toLowerCase() === 'dinner' || category.toLowerCase() === 'dessert') {
        return true;
    } else {
        return false;
    }
}

module.exports = isValidRecipeCategory;
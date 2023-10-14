/* 
MONGODB OPERATORS - They are powerful operators

Logical operators

$Inc => increases certain value ,js does not have separate decrement operator ; use -1,-2,-3 etc.. to perform those tasks
$Min => minimum
$Max => maximum
$Set => used to set data 
Example: book.title = "xyz"

$Unset => These operators are used to removing a particular property from the object

Array operators

Consider an array 
name = ["hii","everyone"]
$push => Used to insert data in the last 
$pop => Used to extract/delete/remove data from the last
$pull => Used to extract data from the list,access any element from the array
Eg: pull: {
    name: "everyone"
}

$addtoset => Same as push but it does't allow duplicates


*/
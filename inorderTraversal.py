def inorderTraversal(input_arr):
    res_arr = []
    for item in input_arr:
        # check if the current item is list
        if isinstance(item, list):
            # recurssively call the function to further flatten the list and add to the new list
            res_arr.extend(inorderTraversal(item))
        else:
            # add int item to the new list
            res_arr.append(item)

    return res_arr

# Test cases
case1_input = [[[6]],[1,3],[]]
case2_input = [[[3, 4, 5]]]
case3_input = [[[3]], 4, 1]
case4_input = []
case5_input = [[1], [2, 3], [4, 5, 6], [7, 8, 9, 10]]

test_cases = [case1_input, case2_input, case3_input, case4_input, case5_input]

for current_case in test_cases:
    print(inorderTraversal(current_case))
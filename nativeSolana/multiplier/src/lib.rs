// pub fn add(left: u64, right: u64) -> u64 {
//     left + right
// }
//
// #[cfg(test)]
// mod tests {
//     use super::*;
//
//     #[test]
//     fn it_works() {
//         let result = add(2, 2);
//         assert_eq!(result, 4);
//     }
use borsh::{BorshDeserialize, BorshSerialize};
use solana_program::{
    account_info::{Account, AccountInfo, next_account_info},
    entrypoint::{self, ProgramResult},
    msg,
    pubkey::Pubkey,
};

entrypoint!(multiplier_function);

#[derive(BorshDeserialize, BorshSerialize)]
enum InstructionType {
    Number([u8; 2]),
}

#[derive(BorshDeserialize, BorshSerialize)]
struct MultipliedValue {
    input: [i32; 2],
    result: i32,
}

pub fn multiplier_function(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {
    //main multiplier_function which take the input and return the value
    let acc = next_account_info(&mut accounts.iter()).expect("failed to iterate over the array");
    //use of borsh
    let instruction_type = InstructionType::try_from_slice(instruction_data)?;
    match instruction_type {
        InstructionType::Number(value) => {
            let mut data = MultipliedValue::try_from_slice(&mut acc.data.borrow())?;
            data.input = [value[0] as i32, value[1] as i32];
            data.result = (value[0] * value[1]) as i32;
        }
    }

    Ok(())
}

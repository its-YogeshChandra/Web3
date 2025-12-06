use borsh::{BorshDeserialize, BorshSerialize};
use solana_program::{
    account_info::{Account, AccountInfo, next_account_info},
    entrypoint,
    entrypoint::ProgramResult,
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

    //adding to the system
    let mut data = MultipliedValue::try_from_slice(&mut acc.data.borrow())?;

    match instruction_type {
        InstructionType::Number(value) => {
            data.input = [value[0] as i32, value[1] as i32];
            data.result = (value[0] * value[1]) as i32;
        }
    }

    //
    data.serialize(&mut *acc.data.borrow_mut())
        .expect("error while serealizing the data ");

    // add the data into the system

    Ok(())
}

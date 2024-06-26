import React, { useMemo } from 'react';
import { RiDeleteBinLine } from 'react-icons/ri';
import Image from 'next/image';
import { Label } from '../../common/micro/label';
import { ButtonComponent } from '../../common/micro/button';
import { InputComponent } from '../../common/micro/input';

function CenterForm(props) {
    const {
        register,
        selectedImage,
        handleSelectedOption,
        setSelectedImage,
        question,
        setQuestion,
        inputFields,
        handleFormChange,
        addFields,
        optionType,
        requiredOptionField,
        removeFields,
        isViewOnly,
    } = props;

    const imageComponent = useMemo(() => {
        return selectedImage ? (
            <>
                <Label key={'default'} className={'inline-block mb-2 text-gray-500'}>
                    Your Image
                </Label>
                <div>
                    <Image
                        alt='not fount'
                        width={250}
                        height={250}
                        src={
                            typeof selectedImage === 'string'
                                ? selectedImage
                                : URL.createObjectURL(selectedImage)
                        }
                    />
                    <br />

                    <ButtonComponent
                        onClick={() => setSelectedImage(null)}
                        className={'w-full px-4 py-2 text-white bg-blue-500 rounded shadow-xl'}
                    >
                        Remove
                    </ButtonComponent>
                </div>
            </>
        ) : (
            <>
                <Label key={'default'} className={'inline-block mb-2 text-gray-500'}>
                    Upload Question image
                </Label>
                <div className='flex items-center justify-center w-full'>
                    <Label
                        key={'default'}
                        className={
                            'flex flex-col w-full h-32 border-4 border-blue-200 border-dashed hover:bg-gray-100 hover:border-gray-300'
                        }
                    >
                        <React.Fragment>
                            <label htmlFor='fileInput' className='flex flex-col items-center justify-center pt-7'>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    className='w-8 h-8 text-gray-400 group-hover:text-gray-600'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    stroke='currentColor'
                                >
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth='2'
                                        d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
                                    />
                                </svg>

                                <br />

                                <p className='pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600'>
                                    Attach a file
                                </p>
                            </label>

                            <input
                                id='fileInput'
                                type='file'
                                accept='image/*'
                                className='opacity-0 bg-red-900'
                                onChange={(event) => {
                                    setSelectedImage(event.target.files[0]);
                                }}
                            />
                        </React.Fragment>
                    </Label>
                </div>
            </>
        );
    }, [selectedImage, setSelectedImage]);

    return (
        <>
            <section className='flex md:grid-cols-1 xl:grid-cols-1 gap-6'>
                <div className='card-container'>
                    <div className='mr-6'>
                        <div className='flex justify-center mt-8'>
                            <div className='max-w-2xl rounded-lg shadow-xl bg-gray-50'>
                                <div className='m-4'>{imageComponent}</div>
                            </div>
                        </div>
                    </div>
                    <br />
                    <br />

                    <div className='mb-6'>
                        <InputComponent
                            type='text'
                            id='default-input'
                            value={question}
                            disabled={isViewOnly}
                            required
                            onChange={(e) => setQuestion(e.target.value)}
                            placeholder='Type your question'
                            className='bg-gray-50 border text-center border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                        />
                    </div>

                    {/* for options section  */}

                    <div className='mb-6'>
                        {inputFields.map((input, index) => {
                            return (
                                <div className='flex items-center' key={index}>
                                    <InputComponent
                                        type='text'
                                        id='default-input'
                                        className='bg-gray-50 border my-3 text-left border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/4 p-2.5  dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                        name='option'
                                        required
                                        disabled={isViewOnly}
                                        value={input.option}
                                        onChange={(event) => handleFormChange(index, event)}
                                        placeholder={`Option ${String.fromCharCode(65 + index)}`}
                                    />
                                    <InputComponent
                                        type={optionType == 'Multiple' ? 'checkbox' : 'radio'}
                                        className={'mx-5'}
                                        onClick={(event) => handleSelectedOption(index, event)}
                                        disabled={isViewOnly}
                                        checked={input.correct}
                                        required={requiredOptionField}
                                        placeholder='Jane'
                                        name='fav_language'
                                        id={index}
                                    />

                                    {!isViewOnly && (
                                        <ButtonComponent className={'bg-gray-100'} onClick={() => removeFields(index)}>
                                            <RiDeleteBinLine />
                                        </ButtonComponent>
                                    )}

                                    <br />
                                </div>
                            );
                        })}
                        {!isViewOnly && (
                            <ButtonComponent type='button' onClick={addFields} className={'text-blue-400'}>
                                Add More...
                            </ButtonComponent>
                        )}
                    </div>

                    {!isViewOnly && (
                        <div className='flex justify-end'>
                            <ButtonComponent key={'submit'} className={'btn-secondary'}>
                                Submit
                            </ButtonComponent>
                        </div>
                    )}
                </div>
                {/* </form> */}
            </section>
        </>
    );
}

export default React.memo(CenterForm);


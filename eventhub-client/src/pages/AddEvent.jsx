import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import useSecureAxios from '../hooks/useSecureAxios';
import { toast } from 'react-toastify';
import AddForm from './AddForm';

const AddEvent = () => {
  const email = localStorage.getItem("email");
    const { register, handleSubmit } = useForm()

    const axiosSecure =  useSecureAxios();
    const navigate = useNavigate()

    useEffect(() => {
        window.scroll(0, 0)
    }, [])
    const [startDate, setStartDate] = useState(new Date());
    const [loading, setLoading] = useState(false)

    const { mutateAsync } = useMutation({
        mutationKey: ['event'],
        mutationFn: async (eventData) => {
            const { data } = await axiosSecure.post('/event', eventData)
            return data
        },
        onSuccess: () => {
            toast.success('Event Added Succecfull')
            setLoading(false)
            navigate('/my-events')
        },
        onError: () => {
            toast.error('SomeThings Problem!!!')
        }
    })

    const handlebtn = async formData => {
        console.log(formData ,startDate, email) ;
        try {
            setLoading(true)

            const eventData = { ...formData, participantCount: parseInt(0), dateAndTime: startDate, AddedEmail: email, }

            // post a camps 
            mutateAsync(eventData)
            setLoading(false)
        } catch (err) {
            console.log(err)
            setLoading(false)
        }

    }
    if (loading) return <LoadingSpiner />
    return (
        <div>
            <Helmet>
                <title>EventHub | AddEvent</title>
            </Helmet>
            <AddForm
                startDate={startDate}
                setStartDate={setStartDate}
                register={register}
                handleSubmit={handleSubmit}
                handlebtn={handlebtn}
                loading={loading}
            />
        </div>
    );
};

export default AddEvent;
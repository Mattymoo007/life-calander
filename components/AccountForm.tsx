import { FC, useState } from 'react'
import Datepicker from 'react-tailwindcss-datepicker'
import { DateRangeType } from 'react-tailwindcss-datepicker/dist/types'
import { toast } from 'react-toastify'
import { IoCheckmarkCircleSharp, IoCheckmarkSharp } from 'react-icons/io5'
import { User, ThymeData } from '@prisma/client'

const AccountForm: FC<{ user: User; thymeData: ThymeData }> = ({
  user,
  thymeData,
}) => {
  const birthDate = {
    startDate: thymeData.birthDate ? new Date(thymeData.birthDate) : null,
    endDate: thymeData.birthDate ? new Date(thymeData.birthDate) : null,
  }

  const [formData, setFormData] = useState<AnyObject>({
    name: user?.name,
    email: user?.email,
    totalTime: thymeData?.totalTime ?? 0,
    birthDate: birthDate,
  })

  const [errors, setErrors] = useState<string[]>([])

  const updateFormData = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleDateChange = (value: DateRangeType) => {
    setFormData({
      ...formData,
      birthDate: value,
    })
  }

  const toastIcon = {
    success: () => <IoCheckmarkCircleSharp className="text-primary text-lg" />,
    error: () => <IoCheckmarkSharp className="text-red-500" />,
  }

  const validateData = () => {
    setErrors([])
    let errors: string[] = []

    console.log(formData)

    for (const key in formData) {
      if (!formData[key] || formData[key].startDate === null) {
        const keyName = key
          .replace(/([A-Z])/g, ' $1')
          .trim()
          .toLowerCase()
        errors = [...errors, `${keyName} is required`]
      }
    }

    setErrors(errors)

    return errors.length === 0
  }

  const updateUser = async (e: any) => {
    e.preventDefault()
    const isValidated = validateData()

    if (!isValidated) return

    const data = {
      ...formData,
      birthDate: formData.birthDate.startDate,
    }

    const res = await fetch(`/api/user/${user?.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).catch((err) => err)

    if (res.status === 200) {
      toast.success('Account update!', {
        icon: toastIcon.success,
      })
    } else {
      toast.error('Something went wrong!', {
        icon: toastIcon.error,
      })
    }
  }

  return (
    <section>
      {/* Errors */}
      {errors.length > 0 && (
        <ul className="flex flex-col gap-2 mb-4">
          {errors.map((error, i) => (
            <li className="card error-msg" key={i}>
              {error}
            </li>
          ))}
        </ul>
      )}

      <div className="card">
        <form onSubmit={updateUser}>
          <div className="p-10">
            <div className="flex flex-col gap-8">
              <div>
                <h2 className="text-xl font-medium">Personal information:</h2>
                <p className="text-gray-500">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Voluptates explicabo consequatur eveniet a
                </p>
              </div>
              <div className="flex flex-col gap-6">
                {/* Name */}
                <label>
                  Full name:
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => updateFormData(e)}
                  />
                </label>
                <div className="grid lg:grid-cols-2 gap-4">
                  {/* Email */}
                  <label>
                    Email:
                    <input
                      type="email"
                      name="email"
                      placeholder="example@gmail.com"
                      value={formData.email}
                      onChange={(e) => updateFormData(e)}
                    />
                  </label>
                  {/* Date of birth */}
                  <label>
                    Date of birth:
                    <Datepicker
                      inputClassName="border border-gray-300 rounded-md font-medium text-normal"
                      toggleClassName="top-0"
                      value={formData.birthDate}
                      placeholder={'Set your date of birth'}
                      onChange={(val: any) => handleDateChange(val)}
                      primaryColor={'lime'}
                      asSingle={true}
                      useRange={false}
                      startFrom={new Date('2000-01-01')}
                    />
                  </label>
                </div>
              </div>
              <hr />
              <div>
                <h2 className="text-xl font-medium">Thyme information:</h2>
                <p className="text-gray-500 ">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                </p>
              </div>
              <div className="flex flex-col gap-6">
                <div className="grid lg:grid-cols-2 gap-4">
                  {/* Total time */}
                  <label>
                    Amount of time (years):
                    <input
                      min="1"
                      max="150"
                      type="number"
                      id="totalTime"
                      name="totalTime"
                      placeholder="90"
                      value={formData.totalTime}
                      onChange={(e) => updateFormData(e)}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end bg-gray-50 px-5 py-3 overflow-hidden rounded-b-lg">
            <button type="submit" className="btn btn-primary btn-outline">
              Save
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default AccountForm

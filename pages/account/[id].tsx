import { GetServerSideProps, NextPage } from 'next'
import Image from 'next/image'
import { useState } from 'react'
import Datepicker from 'react-tailwindcss-datepicker'
import { DateRangeType } from 'react-tailwindcss-datepicker/dist/types'
import { getUserById } from '~/utils/db'
import { withAuth } from '~/utils/withAuth'

const Account: NextPage<{ user: User }> = ({ user }) => {
  const [formData, setFormData] = useState({
    name: user?.name,
    email: user?.email,
  })

  const [birthDate, setBirthDate] = useState<DateRangeType>({
    startDate: null,
    endDate: null,
  })

  const updateFormData = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleDateChange = (value: DateRangeType) => {
    setBirthDate(value)
  }

  const updateUser = async () => {
    const res = await fetch(`/api/users/${user?.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        birthDate: birthDate.startDate,
      }),
    })
    console.log('clientres', res)
  }

  return (
    <div className="container aside-layout items-start">
      {/* Profile overview */}
      <div className="card card-primary flex flex-col items-center">
        <div className="relative bg-primary/20 w-full flex justify-center py-5">
          <Image
            src={user?.image ?? ''}
            alt="user-profile"
            width={50}
            height={50}
            className="rounded-full -top-5 -left-5"
          />
        </div>
        <p className="text-lg">{user?.name}</p>
      </div>

      {/* Profile details */}
      <div className="card">
        <div className="p-10 flex flex-col gap-8">
          <div>
            <h2 className="text-xl font-medium">Personal information:</h2>
            <p className="text-gray-500">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Voluptates explicabo consequatur eveniet a
            </p>
          </div>

          <form className="flex flex-col gap-6">
            <label>
              Full name:
              <input
                type="text"
                id="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => updateFormData(e)}
              />
            </label>

            <div className="grid lg:grid-cols-2 gap-4">
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

              <label>
                Date of birth:
                <Datepicker
                  inputClassName="border border-gray-300 rounded-md font-medium text-normal"
                  toggleClassName="top-0"
                  value={birthDate}
                  onChange={handleDateChange}
                  primaryColor={'lime'}
                  asSingle={true}
                  useRange={false}
                  startFrom={new Date('2000-01-01')}
                />
              </label>
            </div>
          </form>
        </div>

        <div className="flex justify-end bg-gray-50 px-5 py-3 overflow-hidden rounded-b-lg">
          <button className="btn btn-primary btn-outline" onClick={updateUser}>
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps = async (ctx: any) => {
  return withAuth(ctx, async () => {
    const user = await getUserById(String(ctx.params?.id))

    return {
      props: { user: JSON.parse(JSON.stringify(user)) },
    }
  })
}

export default Account

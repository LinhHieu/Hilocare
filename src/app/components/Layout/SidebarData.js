import React from 'react';
import {FaBriefcaseMedical} from 'react-icons/fa';
import {RiAccountPinCircleFill} from 'react-icons/ri';
import {BiBuildings, BiDownArrow, BiUpArrow} from 'react-icons/bi';
import {ImNewspaper} from 'react-icons/im';
import {AiOutlineSchedule, AiFillIdcard} from 'react-icons/ai';



export const SidebarData =  [
  {
    title: 'Tài khoản',
    icon: <RiAccountPinCircleFill />,
    iconClose: <BiDownArrow />,
    iconOpen: <BiUpArrow />,
    subNav: [
      {
        title: 'Danh sách tài khoản',
        path: '/AccountList'
      },
      {
        title: 'Thông tin tài khoản',
        path: '/AccountInfo'
      }
    ]
  },
  {
    title: 'Kết quả khám',
    icon: <FaBriefcaseMedical />,
    iconClose: <BiDownArrow />,
    iconOpen: <BiUpArrow />,
    subNav: [
      {
        title: 'Danh sách kết quả khám',
        path: '/MedicalInfo'
      },
      {
        title: 'Tạo kết quả khám',
        path: '/MedicalCreate'
      }
    ]
  },
  {
    title: 'Lịch khám bệnh',
    icon: <AiOutlineSchedule />,
    iconClose: <BiDownArrow />,
    iconOpen: <BiUpArrow />,
    subNav: [
      {
        title: 'Danh sách đợt khám',
        path: '/ScheduleList'
      },
      {
        title: 'Tạo lịch khám',
        path: '/CreateSchedule'
      }
    ]

  },
  {
    title: 'Công ty',
    icon: <BiBuildings />,
    iconClose: <BiDownArrow />,
    iconOpen: <BiUpArrow />,
    subNav: [
      {
        title: 'Danh sách công ty',
        path: '/CompanyList'
      },
      {
        title: 'Tạo công ty',
        path: '/CompanyCreate'
      }
    ]

  },
  {
    title: 'Tin tức',
    icon: <ImNewspaper />,
    iconClose: <BiDownArrow />,
    iconOpen: <BiUpArrow />,
    subNav: [
      {
        title: 'Danh sách tin mới',
        path: '/GetNew'
      },
      {
        title: 'Tạo tin mới',
        path: '/CreateNew'
      }
    ]

  },
  {
    title: 'Nhóm quyền',
    icon: <AiFillIdcard />,
    iconClose: <BiDownArrow />,
    iconOpen: <BiUpArrow />,
    subNav: [
      {
        title: 'Danh sách nhóm quyền',
        path: '/GetRole'
      }
    ]
    
  }
];

export default SidebarData;
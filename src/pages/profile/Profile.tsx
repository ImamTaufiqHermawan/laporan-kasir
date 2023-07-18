import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ContentHeader } from '@components';
import { PfButton, PfImage } from '@profabric/react-components';
import styled from 'styled-components';

import ActivityTab from './ActivityTab';
import TimelineTab from './TimelineTab';
import SettingsTab from './SettingsTab';
import { useSelector } from 'react-redux';

const StyledUserImage = styled(PfImage)`
  --pf-border: 3px solid #adb5bd;
  --pf-padding: 3px;
`;

const Profile = () => {
  const [activeTab, setActiveTab] = useState('ACTIVITY');
  const [t] = useTranslation();
  const { profile } = useSelector((state: any) => state.auth.authentication);

  const toggle = (tab: string) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <>
      <ContentHeader title="Profile" />
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3">
              <div className="card card-primary card-outline">
                <div className="card-body box-profile">
                  <div className="text-center">
                    <StyledUserImage
                      width={100}
                      height={100}
                      rounded
                      src="/img/default-profile.png"
                      alt="User profile"
                    />
                  </div>
                  <h3 className="profile-username text-center">
                    {profile.username}
                  </h3>
                  <p className="text-muted text-center">{profile.role}</p>
                  <ul className="list-group list-group-unbordered mb-3">
                    <li className="list-group-item">
                      <b>{t<string>('header.user.ID')}</b>

                      <span className="float-right">3</span>
                    </li>
                    <li className="list-group-item">
                      <b>{t<string>('header.user.joined')}</b>
                      <span className="float-right">2023-Maret-10</span>
                    </li>
                    <li className="list-group-item">
                      <b>{t<string>('header.user.updated')}</b>
                      <span className="float-right">2023-April-10</span>
                    </li>
                  </ul>
                </div>
                {/* /.card-body */}
              </div>              
            </div>
            <div className="col-md-9">
              <div className="card">
                <div className="card-body">
                  <SettingsTab isActive={true} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
